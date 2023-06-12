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
      <p>{{ amount }} {{ getCurrencyLetters(from) }} <span class="arrow-icon">→</span> {{ convertedAmount }} {{
        getCurrencyLetters(to) }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currencies: [], // Array to store available currencies
      from: "", // Selected currency from
      to: "", // Selected currency to
      amount: 0, // Amount to convert
      rates: {}, // Object to store exchange rates
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
    // getFlagIcon(currency): This method computes the flag icon code for a given currency. 
    // It takes the currency as a parameter and returns the flag icon code.
    getFlagIcon(currency) {
      const codePoints = currency.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    },
    // switchCurrencies(): This method is triggered when the "switch-icon" element is clicked. 
    // It swaps the values of the "from" and "to" variables, allowing the user to switch the selected currencies for conversion.
    switchCurrencies() {
      [this.from, this.to] = [this.to, this.from];
    },
    // getCurrencyLetter(currency): This method takes a currency as input and returns the first, second, and third letters of the currency.
    // It checks if the currency is defined and returns the respective letters. If the currency is undefined or shorter than 3 characters, it returns an empty string.
    getCurrencyLetters(currency) {
      if (currency && currency.length >= 3) {
        return currency.substring(0, 3);
      } else {
        return "";
      }
    },

  },
};
</script>

<style src="../styles/currency-converter.css" scoped></style>
