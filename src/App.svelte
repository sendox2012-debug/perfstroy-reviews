<script>
    import ReviewForm from "./ReviewForm.svelte";
    import Success from "./Success.svelte";

    let state = "form";
    let reviewData = null;

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
            <ReviewForm onSuccess={handleSuccess} />
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
