<script lang="ts">
    let { 
        id = 'name',
        name = 'name',
        label = 'Name',
        placeholder = 'Enter Fakemon name',
        value = ''
    } = $props();
</script>

<div>
    <label for={id} class="block text-sm font-medium text-gray-300">{label}</label>
    <input
        type="text"
        {id}
        {name}
        bind:value
        class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-indigo-400 focus:ring-indigo-400"
        {placeholder}
    />
</div>