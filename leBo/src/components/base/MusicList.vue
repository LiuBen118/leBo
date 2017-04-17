<template>
    <div>
      <div class="MusicList">
        <div class="title">
          <div class="back" @click="back">
            <i class="icon-chevron-left"></i>
          </div>
          <h2>{{ MusicTitle.album_title }}</h2>
        </div>
        <div class="introduce">
          <dl>
            <dt>
              <img :src="Pic" alt="">
            </dt>
            <dd>
              <p>{{ MusicTitle.album_title }}</p>
              <span>主播名:{{ MusicTitle.artist_name }}</span>
            </dd>
          </dl>
        </div>
      	<ul class="List">
         <li v-for="(item,ind) in MusicList">
          <router-link :to="{name:'play',params:{id:item.song_id}}" class="list-div" tag="div">
            <span>{{ ind+1 }}</span>
            <p>{{ item.song_title }}</p>
            <i>
              <img src="../../public/img/down2.png" alt="">
            </i>
          </router-link>
         </li> 
        </ul>
      </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      MusicList : [],
      MusicTitle : {},
      Pic : ''
    }
  },
  created (){
    this.getMusicList();
  },
  methods : {
    getMusicList (){
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/album?callback=jsonp4&type=getAlbumDetail&args=*%2Csonglist.song.pic&album_id='+this.$route.params.id+'&start=1&sort=updatetime_desc&apiver=2&from=lebowebapp&terminal=pcweb&app=121').then(function(data){
        this.MusicTitle = data.body.data.album;
        this.Pic = data.body.data.album.album_pic[4].pi_link;
        this.MusicList = data.body.data.song_list;
        var arr = [];
        for( var i=0;i<this.MusicList.length;i++ ){
          arr.push( this.MusicList[i].song_id );
        }
        this.$store.commit('SongAdd',arr);
      })
    },
    back (){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../public/less/base/MusicList.less";
</style>
