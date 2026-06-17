<script>
    import { CheckCircle, RotateCcw, ExternalLink } from "lucide-svelte";

    export let data;
    export let onReset;
</script>

<div class="glass-card success">
    <div class="success-icon">
        <CheckCircle size={48} />
    </div>

    <h1>Спасибо за отзыв!</h1>
    <p>Ваш отзыв опубликован в нашем Telegram канале</p>

    <a
        href="https://t.me/perfstroy_reviews"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
    >
        <ExternalLink size={18} />
        Посмотреть в канале
    </a>

    <button class="btn-link" on:click={onReset}>
        <RotateCcw size={16} />
        Оставить ещё один отзыв
    </button>
</div>

<style>
    .success {
        text-align: center;
    }

    .success-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(48, 209, 88, 0.15);
        color: var(--success);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        border: 1px solid rgba(48, 209, 88, 0.3);
    }

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }

    .success > p {
        color: var(--text-tertiary);
        margin-bottom: 2rem;
    }

    .btn-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1.5rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        color: var(--primary);
        font-weight: 600;
        cursor: pointer;
        font-size: 0.95rem;
        font-family: inherit;
        padding: 0.6rem 1.2rem;
        border-radius: var(--radius-md);
        transition: all 0.2s;
    }

    .btn-link:hover {
        background: var(--bg-elevated);
        border-color: var(--primary);
    }
</style>
