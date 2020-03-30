<template>
<div>
      <header id="header">
        <div class="logo">
          <router-link to="/MyPage"><img src="./assets/m_logo.png" alt=""></router-link>
        </div>
        <div class="loginInfo">
            <p>Fakturering</p>
            <p>Inloggad som: Förnamn Efternamn</p>
        </div>      
    </header>
<router-view></router-view>
</div> 
</template>

<script>
export default {
	name: 'App',
	components: {},
}
</script>

<style scoped lang="css" >
  #header {
		width: 100%;
		display: flex;
		padding: 30px;
  }

  .loginInfo{
    margin: 13px 0 0 10px;
  }
  .loginInfo p {
    text-align: left;
  }
</style>
