<template>
  <!-- Defines the structure of the application -->
  <div id="app">
    <CurrencyConverter /> <!-- Includes the CurrencyConverter component -->
  </div>
</template>

<script>
import CurrencyConverter from "./components/CurrencyConverter.vue"; // Imports the CurrencyConverter component

export default {
  name: "App", // Sets the name of the application
  components: {
    CurrencyConverter, // Includes the CurrencyConverter component in the application
  },
};
</script>

<style>
#app {
  text-align: center; 
  padding: 1rem; 
}
</style>
