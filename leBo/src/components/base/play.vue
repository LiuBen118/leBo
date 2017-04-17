<template>
    <div>
      <div class="title">
        <a class="back" @click="back">
          <i class="icon-chevron-left"></i>
        </a>
        <h2>{{ titleData.song_title }}</h2>
      </div>
      <div class="t-Img">
        <img :src="titleData.Pic" alt="">
      </div>
      <div class="bar">
        <div class="max-box" ref="maxBox">
          <div class="min-box" ref="minBox">
            <div class="Drag" ref="Drag">{{ Speed }}</div>
          </div>
          <span class="sum">{{ sum }}</span>
        </div>
        <div class="control">
          <div class="prev" @click="Next(1)">
            
          </div>
          <div class="toggle" @click="toggle" ref="toggle">
            
          </div>
          <div class="next" @click="Next(2)">
            
          </div>
        </div>
      </div>
      <div class="player">
        <audio :src="titleData.Src" id="audio" ref="audio"></audio>
      </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      playList : [],
      titleData : {},
      Speed : "",
      sum : "",
      SrcArr : [],
      ind : ''
    }
  },
  computed : {
    SongId (){
      return this.$store.state.songId;
    }
  },
  created (){
    this.getPlayList(this.$route.params.id);
  },
  methods : {
    getPlayList (ind){
      this.SrcArr = [];
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/song?callback=jsonp17&type=getSongFileLink&song_id='+ind+'&linktype=1&args=baseinfo%2Cpic%2Calbum.pic&apiver=2&from=lebowebapp&terminal=pcweb&app=121').then(function(data){
          this.titleData = data.body.data.song;
          this.titleData['Pic'] = this.titleData.song_pic[0].pi_link;
          this.titleData['Src'] = data.body.data.songfile[0].songfile_link;
          this.ind = ind;
      })
    },
    back (){
      this.$router.go(-1);
      this.$refs.audio.pause();
    },
    toggle (){
     if( this.$refs.audio.paused ){
      this.$refs.audio.play();
      this.$refs.toggle.style['backgroundPosition'] = "-120px center";
     }else{
      this.$refs.audio.pause();
      this.$refs.toggle.style['backgroundPosition'] = "-60px center";
     }
    },
    touchMove (audio,w){
      this.$refs.maxBox.addEventListener('touchstart',function(e){
        var duration=audio.duration;
        var bo=e.touches[0].clientX/w*duration;
        audio.currentTime=bo;
      },false)
      this.$refs.Drag.addEventListener('touchmove',function(e){
        var duration=audio.duration;
        var bo=e.touches[0].clientX/w*duration;
        audio.currentTime=bo;
      },false)
    },
    Next (num){
      for( var i=0;i<this.SongId.length;i++ ){
        if( this.SongId[i] == this.ind ){
            if( num===1 ){
              if( i<=0) return;
              this.getPlayList(this.SongId[i-1]);
            }else if( num===2 ){
              if( i>=this.SongId.length-1 ) return;
              this.getPlayList(this.SongId[i+1]);
            }
            var that = this;
            setTimeout(function(){
              that.$refs.audio.play();
            },1000)
        }
      }
    }
  },
  mounted (){
    var audio = this.$refs.audio,
        that = this,
        maxBox = this.$refs.maxBox.offsetWidth;
        audio.play();
    this.touchMove(audio,maxBox);
    audio.addEventListener('timeupdate',function(){
        var duration=audio.duration;
        var currentTime=audio.currentTime;
        var num=currentTime/duration*maxBox;
        that.$refs.minBox.style.width=num+'px';
        if( that.$refs.minBox.offsetWidth<5 ){
          that.$refs.Drag.style['left'] = 0;
        }else{
          if( that.$refs.minBox.offsetWidth > maxBox-that.$refs.Drag.offsetWidth ){
            that.$refs.Drag.style['left'] = maxBox-that.$refs.Drag.offsetWidth+"px";
            audio.currentTime = duration;
          }else{
            that.$refs.Drag.style['left'] = num-5+'px';
          }
        }
        var par = (currentTime/60).toFixed(2).split('.');
        var m = '';
        var s = '';
        var date = new Date;
          date.setMinutes(par[0]);
          date.setSeconds(par[1]);
        m = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
        s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
        that.Speed = m+":"+s;
        if( duration ){
          var time = (duration/60).toFixed(2).split( '.' );
          time[0] = time[0]<10?'0'+time[0]:time[0];
          time[1] = time[1]<10?'0'+time[1]:time[1];
          that.sum = time[0]+':'+time[1];
        }
    });
  }
}
</script>

<style scoped lang="less">
  @import "../../public/less/base/play.less";
</style>
