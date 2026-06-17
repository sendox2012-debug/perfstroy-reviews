<script>
    import {
        Phone,
        AtSign,
        Star,
        MessageSquare,
        Send,
        Sparkles,
    } from "lucide-svelte";
    import { sendReviewToBot } from "./lib/telegram.js";

    export let tg;
    export let onSuccess;

    let contactType = "phone";
    let contact = "";
    let review = "";
    let rating = 5;
    let hoverRating = 0;
    let isSubmitting = false;
    let error = "";

    const handleSubmit = () => {
        error = "";

        if (!contact.trim()) {
            error =
                contactType === "phone"
                    ? "Введите номер телефона"
                    : "Введите username";
            return;
        }

        if (contactType === "phone") {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(contact)) {
                error = "Некорректный номер телефона";
                return;
            }
        } else {
            if (contact.startsWith("@")) contact = contact.substring(1);
            if (contact.length < 3) {
                error = "Username слишком короткий";
                return;
            }
        }

        if (review.trim().length < 5) {
            error = "Отзыв слишком короткий (мин. 5 символов)";
            return;
        }

        isSubmitting = true;

        const data = {
            type: "review",
            contactType,
            contact: contact.trim(),
            rating,
            review: review.trim(),
        };

        // Если открыто в Telegram — отправляем через WebApp
        if (tg) {
            const success = sendReviewToBot(tg, data);
            if (success) {
                // Закрываем Web App
                setTimeout(() => {
                    tg.close();
                }, 500);
                return;
            }
        }

        // Если не в Telegram — редирект (старый способ)
        try {
            const encoded = encodeURIComponent(
                `${contactType}|${contact.trim()}|${rating}|${review.trim()}`,
            );
            const link = `https://t.me/Perfstroybot?start=rev_${encoded}`;
            window.location.href = link;
        } catch (e) {
            error = "Не удалось отправить отзыв";
            isSubmitting = false;
            return;
        }

        setTimeout(() => {
            onSuccess(data);
            isSubmitting = false;
        }, 500);
    };
</script>

<div class="glass-card">
    <div class="header">
        <div class="icon-badge">
            <Sparkles size={24} />
        </div>
        <h1>Оставить отзыв</h1>
        <p>Поделитесь впечатлением о нашей работе</p>
    </div>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label>
                <MessageSquare size={16} />
                Способ связи *
            </label>
            <div class="segmented">
                <button
                    type="button"
                    class="segmented-btn"
                    class:active={contactType === "phone"}
                    on:click={() => {
                        contactType = "phone";
                        contact = "";
                    }}
                    disabled={isSubmitting}
                >
                    <Phone size={16} />
                    Телефон
                </button>
                <button
                    type="button"
                    class="segmented-btn"
                    class:active={contactType === "username"}
                    on:click={() => {
                        contactType = "username";
                        contact = "";
                    }}
                    disabled={isSubmitting}
                >
                    <AtSign size={16} />
                    Username
                </button>
            </div>

            {#if contactType === "phone"}
                <input
                    type="tel"
                    class="input"
                    bind:value={contact}
                    maxlength={15}
                    placeholder="+7 999 123 45 67"
                    disabled={isSubmitting}
                />
            {:else}
                <input
                    type="text"
                    class="input"
                    bind:value={contact}
                    maxlength={32}
                    placeholder="@username"
                    disabled={isSubmitting}
                />
            {/if}
        </div>

        <div class="form-group">
            <label>
                <Star size={16} />
                Оценка
            </label>
            <div class="stars">
                {#each [1, 2, 3, 4, 5] as star}
                    <button
                        type="button"
                        class="star-btn"
                        class:active={(hoverRating || rating) >= star}
                        on:click={() => (rating = star)}
                        on:mouseenter={() => (hoverRating = star)}
                        on:mouseleave={() => (hoverRating = 0)}
                        disabled={isSubmitting}
                    >
                        <Star
                            size={32}
                            fill={(hoverRating || rating) >= star
                                ? "#ffd60a"
                                : "none"}
                            color={(hoverRating || rating) >= star
                                ? "#ffd60a"
                                : "currentColor"}
                        />
                    </button>
                {/each}
            </div>
            <p class="hint center">
                {rating === 0 ? "Без оценки" : `${rating} из 5`}
            </p>
        </div>

        <div class="form-group">
            <label for="review">
                <MessageSquare size={16} />
                Отзыв *
            </label>
            <textarea
                id="review"
                class="textarea"
                bind:value={review}
                maxlength={500}
                placeholder="Расскажите о работе..."
                disabled={isSubmitting}></textarea>
            <p class="hint">{review.length}/500 символов</p>
        </div>

        {#if error}
            <div class="error">{error}</div>
        {/if}

        <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
            <Send size={18} />
            {isSubmitting ? "Отправка..." : "Отправить отзыв"}
        </button>
    </form>
</div>

<style>
    .header {
        text-align: center;
        margin-bottom: 2rem;
    }
    .icon-badge {
        width: 56px;
        height: 56px;
        border-radius: var(--radius-md);
        background: rgba(10, 132, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        color: var(--primary);
    }
    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
    }
    .header p {
        color: var(--text-tertiary);
    }
    .stars {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        padding: 0.5rem 0;
    }
    .star-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        transition: transform 0.2s;
        color: var(--text-tertiary);
    }
    .star-btn:hover:not(:disabled) {
        transform: scale(1.15);
    }
    .star-btn:disabled {
        cursor: not-allowed;
    }
    .center {
        text-align: center;
    }
    .error {
        background: rgba(255, 69, 58, 0.15);
        color: var(--error);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-md);
        margin-bottom: 1rem;
        font-size: 0.9rem;
        border: 1px solid rgba(255, 69, 58, 0.3);
    }
</style>
