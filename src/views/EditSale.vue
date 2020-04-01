<template>

 <!--
   All existerande data ska vara ifylld
   Redigera
   lägg till artiklar
   uppdatera i db
-->

  <div class="EditSale">
	<div class="fieldSection" @submit.prevent="editSale">
    <div class="fields status">
      <b-field label="Status:">
        <b-select
          v-model="sale.statusId"
          placeholder="Ändra status">
          <option value="0">Ej påbörjad</option>
          <option value="1">Pågående</option>
          <option value="2">Färdig</option>
          <option value="3">Borttagen</option>
        </b-select>
      </b-field>
    </div>

    <h1>Redigera sale.id</h1>

    <div class="fieldSection">
      <div class="fields">
        <b-field label="Förvald kund:"></b-field>
        <b-field>
            <b-input placeholder="Förvald kund" disabled></b-input>
        </b-field>
      </div>

      <div class="fields">
        <b-field label="Referens:"></b-field>
        <b-input
          placeholder=" Fyll i referens.."
          v-model="sale.reference">
        </b-input>
      </div>

      <Article-row
        :articles="articles"
        v-for="(row, index) in sale.articleRows"
        v-bind:key="row.Id"
        v-model="sale.articleRows[index]">
			</Article-row>

      <div class="fields">
        <b-button @click="addArticleRow">Lägg till artikel</b-button>
      </div>
      <div class="datefields">
        <div class="fields">
          <b-field label="Datum sålt:">
            <b-datepicker
              v-model="sale.dateSold"
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </b-field>
        </div>

        <div class="fields">
          <b-field label="Datum skapat:">
            <b-datepicker
              v-model="sale.dateCreated"
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </b-field>
        </div>

        <div class="fields">
          <b-field label="Datum Färdig:">
            <b-datepicker
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </b-field>
        </div>
      </div>

      <div class="fields buttonField">
        <b-button  @click="putData" type="submit" class="saveBtn" outlined>
          <router-link to="/MySales">Uppdatera</router-link>
        </b-button>
      </div>
    </div>
	</div>
  </div>
</template>

<script>
import ArticleRow from "../components/ArticleRow.vue";

const baseArticleRow = {
  quantity: 1,
  article: {
    articleNumber: "",
    name: "",
    salesPrice: 0,
    unit: "",
    description: ""
  }
};

export default {
  name: "EditSale",
  components: {
    ArticleRow
  },
  props: ['saleId'],

  data() {
    return {
      sale: {
	id: 0,
	reference: "",
        dateSold: [],
        dateCreated: [],
        statusId: 0,
        customer: {
          name: "",
          customerNumber: ""
        },
        articleRows: [baseArticleRow]
      },
      customers: [],
      articles: []
    };
  },
  mounted() {
    this.fetchData();
	},
  methods: {
    fetchData() {
	this.$http.get(`/api/sale/${saleId}`).then(result => {
        this.sale = result.data;
      });

      this.$http.get("/api/customer").then(result => {
        this.customers = result.data;
      });

      this.$http.get("/api/article").then(result => {
        this.articles = result.data;
      });
    },
    addArticleRow() {
      this.sale.articleRows.push(Object.assign({}, baseArticleRow));
		},
    putData: function() {
      this.$http.put(`/api/sale/${saleId}`, { SaleVm: JSON.stringify(this.sale) })
                                                .then(result => {this.id = result.id})
                                                .catch(error => console.log(error))
    }
  }
};
</script>

<style scoped lang="css">
  .EditSale {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    color: #4c4c4c;
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    margin: 20px 0 0 20px;
   
  }

  .fieldSection {
    width: 100%;
  }

  .fields {
    height: auto;
    margin: 10px 20px;
  }

  .field {
    text-align: left;
  }

  .inputfield {
    width: 60%;
  }

  .datefields {
    display: flex;
  }

  .datefields .fields {
    width: 33%;
  }

  .control .select {
    width: 100%;
  }
  .buttonField {
    display: flex;
    justify-content: flex-start;
  }

  .saveBtn {
    height: 70px;
    width: 200px;
    margin-bottom: 20px;
    font-size: 28px;
  }

  .status {
    float: right;
    width: auto;
  }
</style>
