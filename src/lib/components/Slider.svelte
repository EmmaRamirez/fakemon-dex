<script lang="ts">
        let { name, labelText, labelClass, value = $bindable(500) } = $props();
</script>

<div>
    <label for={name} class={labelClass}>{labelText}</label>
    <input
        type="range"
        id={name}
        name={name}
        min="0"
        max="1000"
        step="1"
        class="mt-1 block w-full"
        bind:value
    />
    <div class="mt-1 text-sm text-gray-400">
        <span id="heightValue">{value}</span> cm
    </div>
</div>