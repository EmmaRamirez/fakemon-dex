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
        <option value="">Select a habitat</option>
        <option value="desert">Desert</option>
        <option value="urban">Urban</option>
        <option value="jungle">Jungle</option>
        <option value="forest">Forest</option>
        <option value="mountain">Mountain</option>
        <option value="grassland">Grassland</option>
        <option value="tundra">Tundra</option>
        <option value="swamp">Swamp</option>
        <option value="cave">Cave</option>
        <option value="beach">Beach</option>
        <option value="ocean">Ocean</option>
        <option value="river">River</option>
        <option value="volcano">Volcano</option>
        <option value="arctic">Arctic</option>
    </select>
</div>