<template>
<div class="logIn">
	<section class="logo-body">
		<div class="hero-body">
			<img src="../assets/m_logo.png" alt="">
			<h2 class="subtitle">Fakturering</h2>
		</div>
	</section>

	<div class="">
		<form @submit.prevent="loginSubmit">
			<b-field>
				<b-input type="email" placeholder="E-mail" v-model="email"></b-input>
			</b-field>
			<b-field>
				<b-input type="password" placeholder="Password"  v-model="password" password-reveal></b-input>
			</b-field>
			<div class="buttons">
				<button class="button"><router-link to="/MyPage">Logga in</router-link></button>
			</div>
		</form>
	</div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//import VLink from '../components/VLink.vue';
  

export default {
name: 'Login',

components: {
	// VLink,
},
data() {
	return {
		email: '',
		password: '',
	}
},
computed: {
	...mapState ([
		'loggingIn',
		'loginError',
		'accessToken',
	])
},
methods: {
	...mapActions ([
		'doLogin',
	]),
	loginSubmit() {
		this.doLogin({
			email: this.email,
			password: this.password,
		})
	}
}
}
</script>

<style scoped lang="css">
.logIn {
	max-width: 500px;
	margin: 0 auto;
	padding: 0 10px;
}

.logo-body{
		margin: 0 auto;
		width: fit-content;

	}
.button, .button a {
	width: 100%;
}

</style>
