<script>
    import { onMount } from "svelte";
    import axios from "axios"

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  
  let userData = axios.get("http://localhost:8003/redirect", {
        params: {
            code: code
        }
    })

    $: {
        console.log(userData)
    }

  if(code == null){
    //TODO redirect user to login
  }
</script>

<main>
    {#await userData}
        <h1>loading</h1>
    {:then value}
        <h1>{value.data.uid}</h1>
    {/await}
</main>

<style>
  
</style>
