<script lang="ts">
    import { Spring } from 'svelte/motion';

    const value = new Spring(100);
    let { name, labelText, unitValue, labelClass, min = 0, max = 1000, step = 1 } = $props();
</script>

<div>
    <label for={name} class={labelClass}>{labelText}</label>
    <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        step={step}
        class="mt-1 block w-full"
        bind:value={value.target}
    />
    <div class="mt-1 text-sm text-gray-400">
        <span id="heightValue">{value.current.toFixed(0)}</span> {unitValue}
    </div>
</div>