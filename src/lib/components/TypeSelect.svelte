<script lang="ts">
    
    let { name, labelText, labelClass } = $props();
</script>

<div>
    <label for={name} class={labelClass}>{labelText}</label>
    <select
        id={name}
        name={name}
        class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-indigo-400 focus:ring-indigo-400"
    >
        <option value="">Select a type</option>
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="grass">Grass</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
    </select>
</div>