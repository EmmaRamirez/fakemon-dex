<script lang="ts">
    let { name, labelText, labelClass, values = $bindable([]) } = $props();
</script>
<div>
    <label for={name} class={labelClass}>{labelText}</label>
    <div class="mt-2 flex flex-wrap gap-2">
        {#each values as value}
            <label class="inline-flex items-center">
                <input
                    type="checkbox"
                    name={name}
                    value={value}   
                    class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-400 focus:ring-indigo-400"
                />
                <span class="ml-2 text-sm text-gray-300">{value}</span>
            </label>
        {/each}
    </div>
</div>