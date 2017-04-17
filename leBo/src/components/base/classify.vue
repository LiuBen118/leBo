<template>
   <div>
    <div class="title">
        <router-link class="back" :to="{name:'home'}">
          <i class="icon-chevron-left"></i>
        </router-link>
        <h2>{{ this.$route.params.name }}</h2>
    </div>
    <div class="content">
      <div class="H">
        <div class="tap" v-stop-nav>
          <a href="javascript:;" 
          v-for="(item,ind) in tapList"
          ><span 
          :class="ind==0?'on':''" 
          @click="tog(item.tag_id,ind)"
          ref = 'tap'
          >{{ item.tag_name }}</span></a>
        </div>
      </div>
      <div class="contentList">
          <dl v-for="item in contentList">
            <dt>
              <router-link 
              :to="{name:'MusicList',params:{id:item.album_id}}"
              tag="div"
              key="1"
              >
              <img :src="item.album_pic[0].pi_link" alt="">
              </router-link>
            </dt>
            <dd>
              <h2>{{ item.album_title }}</h2>
              <h3>{{ item.artist_name }}</h3>
              <p><span>{{item.album_lastuptime | time}}</span><span><i class="icon-user"></i><output>{{ item.statistics.play_count }}</output></span></p>
              <span class="Collection" @click="Alert"><i class="icon-heart-empty"></i>收藏</span>
            </dd>
          </dl>
      </div>
    </div>
   </div>
</template>
<script>

export default {
  data () {
    return {
      content : [],
      tapList : [],
      id : '',
      contentList : []
    }
  },
  created (){
    this.getTap(this.$route.params.id);
  },
  methods : {
    getTap (ind){
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/tag?callback=jsonp21&type=getChildTagList&tag_id='+ind+'&apiver=2&from=lebowebapp&terminal=pcweb&app=121').then(function(data){
        this.tapList = data.body.data;
        this.getList(data.body.data[0].tag_id);
      })
    },
    getList (id){
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/tag?callback=jsonp19&type=getAlbumListByTagid&args=album.*%2Csong.*%2Csong.album.*%2Csong.pic%2Ctag%2Csong.album.tag&order=hot_desc&tag_id='+id+'&limit=20&start=1&apiver=2&from=lebowebapp&terminal=pcweb&app=121').then(function(data){
        this.contentList = data.body.data;
      })
    },
    tog (id,ind){
      for( var i=0;i<this.$refs.tap.length;i++ ){
        this.$refs.tap[i].className = '';
      }
      this.$refs.tap[ind].className = 'on';
      this.getList(id);
    },
    Alert (){
      alert("就不让你收藏");
    }
  },
  filters: {  
    time: function (value) { 
      var date = new Date(parseInt(value) * 1000).toLocaleString().split( '/' );

      var timeStamp = parseInt( new Date()*1/1000 );
      var sum = parseInt( timeStamp-value );
      var tian = parseInt( sum/60/60/24 );
      
      if( tian<28 ){
        return tian+"天前";
      }else{
        return date[0]+'年'+date[1]+"月"+date[2].split( ' ' )[0]+"日"
      }

    }  
  }  
}
</script>

<style scoped lang="less">
  @import "../../public/less/base/classify.less";
</style>
