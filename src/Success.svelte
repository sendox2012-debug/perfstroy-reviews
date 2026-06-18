<script>
    import {
        CheckCircle,
        RotateCcw,
        ExternalLink,
        Phone,
        AtSign,
        Star,
    } from "lucide-svelte";

    let { data, onReset } = $props();
</script>

<div class="glass-card success">
    <div class="success-icon"><CheckCircle size={48} /></div>
    <h1>Отлично!</h1>
    <p>Теперь напишите комментарий боту в Telegram</p>

    {#if data}
        <div class="review-summary">
            <div class="summary-item">
                {#if data.contactType === "phone"}
                    <Phone size={16} />
                {:else}
                    <AtSign size={16} />
                {/if}
                <span
                    >{data.contactType === "phone"
                        ? "+"
                        : "@"}{data.contact}</span
                >
            </div>

            <div class="summary-item">
                <Star size={16} />
                <span>Оценка: {data.rating} из 5</span>
            </div>
        </div>
    {/if}

    <a
        href="https://t.me/perfstroy_reviews"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
    >
        <ExternalLink size={18} /> Посмотреть отзывы в канале
    </a>

    <button class="btn-link" on:click={onReset}>
        <RotateCcw size={16} /> Оставить ещё один отзыв
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
    }
    .success > p {
        color: var(--text-tertiary);
        margin-bottom: 1.5rem;
    }

    .review-summary {
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 1rem;
        margin-bottom: 1.5rem;
        text-align: left;
    }

    .summary-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0;
        color: var(--text-secondary);
        font-size: 0.9rem;
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
