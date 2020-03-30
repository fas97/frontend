<template>
	<div class="buttons">
		<b-button type="is-light" outlined><router-link to="/Sale">Ny försäljning / nytt projekt</router-link></b-button>
		<b-button type="is-light" outlined><router-link to="/MySales">Visa försäljningar</router-link></b-button>
		<b-button type="is-light" outlined><router-link to="/Login">Skicka fakturor till Fortnox</router-link></b-button>
	</div>
</template>

<script>
//import VLink from '../components/VLink.vue';

export default {
	name: 'MyPage',
		components: {
			// VLink,
	}, 
}
</script>

<style scoped lang="css">
	.buttons {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		padding: 30px 10px;
			
	}
	
	.button.is-light.is-outlined {
		margin: 10px 0;
		border-color: #2b2b2b;
		color: #4b4b4b;
		max-width: 100%;
		width: 500px;
		height: 100px;
		font-size: 22px;
	}
</style>