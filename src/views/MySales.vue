<template>
  <div class="MySales">
    <h1>Mina försäljningar</h1>
		
    <section class="table">		
			<b-select placeholder="Hantera markerade">
				<option value="0">Status: Påbörjad</option>
				<option value="1">Status: Pågående</option>
				<option value="2">Status: Färdig</option>
				<option value="3">Ta bort</option>
			</b-select>

      <b-table
        :data="sales"	
        :checked-rows.sync="checkedRows"
        :is-row-checkable="(row) => row.id"
        checkable
				paginated
				per-page="5"
				:opened-detailed="defaultOpenedDetails"
				detailed
				detail-key="id"
				:show-detail-icon="showDetailIcon"
				aria-page-label="Page"
				aria-current-label="Current page"
				aria-next-label="Next page"
				aria-previous-label="Previous page">
				
        <template slot-scope="props">
          <b-table-column field="id" label="Projektnummer" width="40" numeric>
            {{ props.row.id}}
          </b-table-column>

          <b-table-column field="customerNumber" label="Företag">
            <template v-if="showDetailIcon">
							{{ props.row.customerNumber }}
						</template>
						<template v-else>
							<a @click="toggle(props.row)">
								{{ props.row.customerNumber }}
							</a>
						</template>
          </b-table-column>

          <b-table-column field="yourReference" label="Referens">
            {{ props.row.yourReference }}
          </b-table-column>

          <b-table-column field="dateSold" label="Datum sålt" centered>
            <span class="tag is-success">
              {{ props.row.dateSold}}
            </span>
          </b-table-column>

          <b-table-column label="Status">
            <span>
              <b-icon pack="fas"
              :icon="props.row.statusId === 'Färdig' ? 'check' : 'circle'">
              </b-icon>
              {{ props.row.statusId }}
            </span>
          </b-table-column>

          <b-table-column field="" label="Åtgärd">
            <b-button class="saveBtn" outlined type="submit"><router-link :to="{ name: 'EditSale', params: { saleId: props.row.id } }">Redigera</router-link></b-button>
            <b-button class="saveBtn" outlined type="submit" @click="deleteData(props.row.id)">Ta bort</b-button>
					</b-table-column>
        </template>

        <template slot="bottom-left">
          <b>Total checked</b>: {{ checkedRows.length }}
        </template>

				<template slot="detail" slot-scope="props">
					<article class="media">
						<div class="media-content">
							<div class="content">
								<strong>{{ props.row.customerNumber }}</strong>
								<p>Referens: {{ props.row.yourReference }}</p>									
								<p>Försäljare:{{ props.row.userId }}</p>
								<p>Datum såld: {{ props.row.dateSold }}</p>
								<p>Datum skapad: {{ props.row.dateCreated }}</p>
								<p>Datum slutförd: {{ props.row.dateDone }}</p>
								<p>Status: {{ props.row.statusId }}</p>
								<p>Datum Levererad: {{ props.row.dateDelivered }}</p>
							</div>
						</div>
					</article>
				</template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  icon="emoticon-sad"
                  size="is-large">
                </b-icon>
              </p>
              <p>Inga projekt registrerade</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>

export default {
  name: "MySales",
  components: {},
  props: {
    //sale: Array
  },

  data() {
    return {
      checkedRows: [],
			sales: [],
			defaultOpenedDetails: [1],
			showDetailIcon: true
    };
    
  },

  mounted() {
		this.fetchData();
  },
  
  methods: {
    fetchData: function() {
			this.$http.get("/api/sale")
				.then(result => {this.sales = result.data;
      });
		},

		deleteData(saleId) {
			this.$buefy.notification.open('Project removed!')
			this.$http.delete(`/api/sale/${saleId}`)
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error)
			})
		},
		
		toggle(row) {
			this.$refs.table.toggleDetails(row)
		}
  },
};
</script>

<style scoped lang="css">

	.MySales {
		max-width: 1400px;
		margin: 0 auto;
	}

  h1 {
    color: #4c4c4c;
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    margin: 20px 0 0 20px;
  }

  .table {
    padding: 20px;
  }

	.button {
		min-width: 90px;
		margin: 0 10px;
	}
</style>
