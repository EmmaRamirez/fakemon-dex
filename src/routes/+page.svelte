<script lang="ts">
	import TypeSelect from "$lib/components/TypeSelect.svelte";
	import HabitatSelect from "$lib/components/HabitatSelect.svelte";
	import BestStats from "$lib/components/BestStats.svelte";
	import HeightSlider from "$lib/components/HeightSlider.svelte";
	import WeightSlider from "$lib/components/WeightSlider.svelte";

	let fakemon = [
		{
			image: 'fakemon/1.png',
			name: 'Babunch',
			type1: 'Grass',
			type2: 'Fighting',
			height: 500,
			weight: 500,
			dex: `Banpunch, the Boxing Fruit Pokémon. Banpunch evolved in tropical forests where overripe bananas would fall and ferment—this gave rise to its potent fighting spirit. Its body is wrapped in a tough yellow peel that can absorb blows, while the green leafy spikes on its back pulse with energy when it's fired up. With its massive punching gloves, it delivers rapid jabs that can shatter tree trunks. Its tail resembles a bruised banana and releases a pungent scent when threatened, warding off predators and rivals alike.`
		},
		{}
	];
</script>

<svelte:head>
	<title>Fakemon Dex</title>
	<meta name="description" content="A Fakemon Generator" />
</svelte:head>

<section class="flex flex-col justify-center items-center flex-[0.6] p-4">
	<div class="grid w-full grid-cols-2 gap-4">
		<div class="rounded-lg bg-gray-800 p-4">
			<form class="space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-300">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						class="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-indigo-400 focus:ring-indigo-400"
						placeholder="Enter Fakemon name"
					/>
				</div>

				<div class="flex gap-2">
					<TypeSelect />

					<TypeSelect />
				</div>

				<HabitatSelect />

				<BestStats />

				<HeightSlider />
				<WeightSlider />
				<button
					type="submit"
					class="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
				>
					Generate Fakemon
				</button>
			</form>
		</div>
		<div class="rounded-lg bg-gray-800 p-4">
			<div class="grid grid-cols-4 gap-4">
				{#each fakemon as fakes}
					<div
						class="rounded-lg border border-gray-700 bg-gray-700 p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<div class="mb-2 aspect-square rounded-lg bg-gray-600">
							{#if fakes.image}
								<img src={fakes.image} alt={fakes.name} class="h-full w-full object-cover" />
							{:else}
								<div class="h-full w-full rounded-lg bg-gray-600"></div>
							{/if}
						</div>
						{#if fakes.name}
							<h3 class="text-lg font-bold text-gray-300">{fakes.name}</h3>
						{/if}
						{#if fakes.type1}
							<p class="text-sm text-gray-500">{fakes.type1}</p>
						{/if}
						{#if fakes.type2}
							<p class="text-sm text-gray-500">{fakes.type2}</p>
						{/if}
						{#if !fakes.name && !fakes.type1 && !fakes.type2}
							<div class="flex flex-col gap-2">
								<p class="h-4 animate-pulse rounded bg-gray-200"></p>
								<p class="h-4 animate-pulse rounded bg-gray-200"></p>
								<p class="h-4 animate-pulse rounded bg-gray-200"></p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
