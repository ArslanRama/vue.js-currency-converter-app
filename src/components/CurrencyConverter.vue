<template>
    <div class="currency-converter">
        <h1>Currency Converter</h1>
        <div class="form-group">
            <label for="from">From:</label>
            <select v-model="from" id="from" class="form-control">
                <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>

            <select v-model="to" id="to" class="form-control">
                <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>

        </div>
        <div class="form-group">
            <label for="amount">Amount:</label>
            <input v-model.number="amount" type="number" id="amount" class="form-control" />
        </div>
        <div class="result">
            <p>{{ amount }} {{ from }} = {{ convertedAmount }} {{ to }}</p>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
            currencies: [],
            from: "",
            to: "",
            amount: 0,
            rates: {},
        };
    },
    computed: {
        convertedAmount() {
            if (this.rates[this.from] && this.rates[this.to]) {
                return ((this.amount / this.rates[this.from]) * this.rates[this.to]).toFixed(2);
            } else {
                return 0;
            }
        },
    },
    mounted() {
        axios
            .get(
                "https://api.exchangerate-api.com/v4/latest/EUR"
            ) 
            .then((response) => {
                this.rates = response.data.rates;
                this.currencies = Object.keys(this.rates);
                this.from = this.currencies[0];
                this.to = this.currencies[1];
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
</script>
  
<style>
.currency-converter {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.result {
    margin-top: 1rem;
}
</style>
  