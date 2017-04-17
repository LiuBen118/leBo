<template>
    <div>
      <div class="content">
      	<div class="title">
  	        <span class="title-border"></span>
  	        <span class="txt">{{ txt }}</span>
      	</div>
        <slot></slot>  
      </div>
    </div>
</template>
<script>

export default {
  props : {
    txt : {
      type : String,
      default : ""
    }
  }

}
</script>

<style scoped lang="less">
  .content{
    width:100%;
    padding:0 1rem;
  	.title{
  		.title-border{
  			border-left: 3px solid #ff9900;
     			padding: 2px 0;
  		}
      .txt{
        line-height: 55px;
        font-size: 1.5rem;
        color: #000;
        margin-left: 5px;
      }
  	}
  }
</style>
