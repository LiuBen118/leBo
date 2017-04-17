<template>
  <div>
    <div class="wrap">
      <div class="banner">
        <img src="../../public/img/banner.jpg" alt="">
        <a href="javascript:;"></a>
      </div>
      <title-bar txt="乐播频道">
        <ul class="channel">
          <li v-for="(item,ind) in channelList">
            <router-link 
            :to="{name:'classify',params:{id:item.tag_id,name:item.tag_name}}"
            key='1'
            style="color:#000">{{ item.tag_name }}</router-link>
          </li>
        </ul>
      </title-bar>
      <title-bar txt="小编推荐">
        <div class="groom">
          <router-link 
          v-for="item in GroomList" 
          :to="{name:'MusicList',params:{id:item.album_id}}"
          key="1"
          class="root"
          tag="div"
          >
            <dl>
              <dt>
                <img :src="item.Pic" alt="">
              </dt>
              <dd>
                <p>{{ item.song_title?item.song_title:item.album_title }}</p>
                <span>#音乐</span>
              </dd>
            </dl>
          </router-link>
        </div>
      </title-bar>
      <title-bar txt="新晋节目榜单">
        <ul class="Fresh" v-for="item in FreshList">
          <li>
            <router-link 
            :to="{name:'MusicList',params:{id:item.album_id}}"
            key="1"
            style="color:#000"
            >
            <dl>
              <dt>
                <img :src="item.Pic" alt="">
              </dt>
              <dd>
                <h2>{{ item.album_title }}</h2>
                <span>{{ item.artist_name }}</span>
                <div class="oP">
                  <p class="p1">
                    <a href="javascript:;" v-for="s in item.tag">
                      {{ s.tag_name }}
                    </a>
                  </p>
                  <p class="p2">
                    <i>11</i>
                    <output>{{ item.statistics.play_count | six }}</output>
                  </p>
                </div>
              </dd>
            </dl>
            </router-link>
          </li>
        </ul>
      </title-bar>
    </div>
  </div>
</template>

<script>
import titleBar from "@/components/base/titleBar";
export default {
  data () {
    return {
      channelList : [],
      GroomList : [],
      FreshList : []
    }
  },
  created (){
    this.getChannel();
    this.getGroom();
    this.getFresh();
  },
  methods : {
    getChannel (){
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/tag?callback=jsonp1&type=getRootTagList',{
        Params : {
          edit:'0',
          apiver:'2',
          from:'lebowebapp',
          terminal:'pcweb',
          app:'121'
        },
      }).then(function(data){
        var arr = [{},{}]
        this.channelList = data.body.data;
        this.channelList = this.channelList.concat(arr);
      })
    },
    getGroom (){
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/business?callback=jsonp2&type=getHotList&limit=6&args=album.*%2Csong.*%2Csong.album.*%2Csong.pic%2Ctag%2Csong.album.tag&terminal=android&apiver=2&from=lebowebapp&app=121',{
        Params : {
         
        },
      }).then(function(data){
        var Pic = [
          {
            img : "http://lebofile.qianqian.com/ting/pic/item/ddb1c986c75590f0b657819be0b20670.jpg"
          },
          {
            img : "http://lebofile.qianqian.com/ting/pic/936b5cc8a435140bbb42e64102756fdb.jpg"
          },
          {
            img : "http://lebofile.qianqian.com/ting/pic/284bed076d71b0885233d134f2630872.jpg"
          },
          {
            img : "http://lebofile.qianqian.com/ting/pic/item/62838b77ee76d406b6aecdca2e6b1373.jpg"
          },
          {
            img : "http://lebofile.qianqian.com/ting/pic/item/b36784cbc5b46d1f8604dc709034dd53.png"
          },
          {
            img : "http://g.hiphotos.baidu.com/ting/whcrop%3D160%2C160/sign=b762237e52fbb2fb347e0e50203a1d95/2f738bd4b31c87014f0799c5207f9e2f0708ff64.jpg"
          }
        ]
        this.GroomList = data.body.data;
        for( var i=0;i<Pic.length;i++ ){
          this.GroomList[i]['Pic'] = Pic[i].img;
        }
      })
    },
    getFresh (){
      this.$http.jsonp('http://leboapi.baidu.com/leboapi/rank?callback=jsonp3&type=getRanking&rank_type=2&args=album.*%2Calbum.album_end%2C+album.pic&start=1&limit=10&apiver=2&from=lebowebapp&terminal=pcweb&app=121').then(function(data){
        this.FreshList = data.body.data;
        for( var i=0;i<this.FreshList.length;i++ ){
          this.FreshList[i]['Pic'] = this.FreshList[i].album_pic[0].pi_link;
        }
      })
    }
  },
  components : {
    titleBar
  }
}
</script>

<style scoped lang="less">
  @import "../../public/less/page/home.less";
</style>
