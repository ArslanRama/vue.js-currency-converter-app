<template>
    <div class="currency-converter">
      <h1 class="converter-title">Currency Converter</h1>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input v-model.number="amount" type="number" id="amount" class="form-control" />
      </div>
      <div class="form-group">
        <select v-model="from" id="from" class="form-control">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            <span class="flag-icon">{{ getFlagIcon(currency) }}</span> {{ currency }}
          </option>
        </select>
        <div class="switch-icon" @click="switchCurrencies">
            <i class="fa fa-exchange"></i>
        </div>
        <select v-model="to" id="to" class="form-control">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            <span class="flag-icon">{{ getFlagIcon(currency) }}</span> {{ currency }}
          </option>
        </select>
      </div>
      <div class="result">
        <p>{{ amount }} {{ from }} <span class="arrow-icon">→</span> {{ convertedAmount }} {{ to }}</p>
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
        .get("https://api.exchangerate-api.com/v4/latest/EUR")
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
    methods: {
      getFlagIcon(currency) {
        const codePoints = currency.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
      },
      switchCurrencies() {
        [this.from, this.to] = [this.to, this.from];
      },
    },
  };
  </script>
  
  <style src="../styles/currency-converter.css" scoped></style>
  