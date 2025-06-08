<div>
    <label class="block text-sm font-medium text-gray-300">Best Stats</label>
    <div class="mt-2 flex flex-wrap gap-2">
        {#each ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'] as stat}
            <label class="inline-flex items-center">
                <input
                    type="checkbox"
                    name="bestStats"
                    value={stat}
                    class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-400 focus:ring-indigo-400"
                />
                <span class="ml-2 text-sm text-gray-300">{stat}</span>
            </label>
        {/each}
    </div>
</div>