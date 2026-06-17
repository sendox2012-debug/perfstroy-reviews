<script>
    import { onMount } from "svelte";
    import ReviewForm from "./ReviewForm.svelte";
    import Success from "./Success.svelte";
    import { initTelegram } from "./lib/telegram.js";

    let tg = null;
    let state = "form";
    let reviewData = null;

    onMount(() => {
        tg = initTelegram();
    });

    const handleSuccess = (data) => {
        reviewData = data;
        state = "success";
    };

    const handleReset = () => {
        state = "form";
        reviewData = null;
    };
</script>

<main class="app">
    <div class="container">
        {#if state === "form"}
            <ReviewForm {tg} onSuccess={handleSuccess} />
        {:else}
            <Success data={reviewData} onReset={handleReset} />
        {/if}
    </div>
</main>

<style>
    .app {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 0;
    }
</style>
