<template>
  <div id="app">
  	<div class="loading" v-if="loading" ref="ssss">
  		<div class="img">
	  		<img src="./public/img/loading.gif">
	  		<span>玩命加载中...</span>
  		</div>
  	</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed : {
    loading (){
      return this.$store.state.loader
    }
  }
}
</script>

<style lang='less'>
	@import "public/css/base/reset.css";
	@import "public/css/font-awesome.min.css";
	html,body{
		width:100%;
		font-size:10px;
	}
	.wrap{
		font-size:1.4rem;
	}
	.loading{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background:#FFF;
		z-index:999;
		.img{
			display:-webkit-box;
			-webkit-box-align:center;
			-webkit-box-pack:center;
			height:20rem;
			margin-top:15rem;
			img{
				display:block;
				width:30%;
			}
			span{
				display:block;
			}
		}
	}
</style>

