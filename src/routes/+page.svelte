<script lang="ts">
	import type { PageProps } from './$types';
	import TypeSelect from '$lib/components/TypeSelect.svelte';
	import HabitatSelect from '$lib/components/HabitatSelect.svelte';
	import CheckboxGroup from '$lib/components/CheckboxGroup.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import { Dice6, LoaderCircle } from 'lucide-svelte';

	const formData = new FormData();

	let { data, form }: PageProps = $props();

	let fakemon = data.entries;
	let loading = $state(false);

	function randomizeFakemon() {
		const randomIndex = Math.floor(Math.random() * fakemon.length);

		console.log(formData);
	}
</script>

<svelte:head>
	<title>Fakemon Dex</title>
	<meta name="description" content="A Fakemon Generator" />
</svelte:head>

<section class="flex flex-[0.6] flex-col items-center justify-center p-4">
	<div class="grid w-full grid-cols-2 gap-4">
		<div class="rounded-lg bg-gray-800 p-4">
			<form
				class="space-y-4"
				action="?/generate"
				method="post"
				use:enhance={() => {
					loading = true;
					return ({ update }) => {
						update({ reset: false });
						loading = false;
					};
				}}
			>
				<TextInput name="name" label="Name" placeholder="Enter Fakemon name" />

				<div class="flex gap-2">
					<TypeSelect
						name="type1"
						labelText="Type 1"
						labelClass="block text-sm font-medium text-gray-300"
					/>

					<TypeSelect
						name="type2"
						labelText="Type 2"
						labelClass="block text-sm font-medium text-gray-300"
					/>
				</div>

				<HabitatSelect
					name="habitat"
					labelText="Habitat"
					labelClass="block text-sm font-medium text-gray-300"
				/>

				<CheckboxGroup
					name="bestStats"
					labelText="Best Stats"
					labelClass="block text-sm font-medium text-gray-300"
					values={['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed']}
				/>

				<CheckboxGroup
					name="Categories"
					labelText="Categories"
					labelClass="block text-sm font-medium text-gray-300"
					values={['Legendary', 'Mythical', 'Ultra Beast']}
				/>

				<CheckboxGroup
					name="Attributes"
					labelText="Attributes"
					labelClass="block text-sm font-medium text-gray-300"
					values={['spooky', 'cute', 'cool', 'beautiful', 'smart', 'cute', 'tough', 'majestic']}
				/>

				<Slider
					unitValue="cm"
					name="height"
					labelText="Height"
					labelClass="block text-sm font-medium text-gray-300"
				/>
				<Slider
					unitValue="kg"
					name="weight"
					labelText="Weight"
					labelClass="block text-sm font-medium text-gray-300"
				/>

				<div class="button-group flex w-full gap-2">
					<button
						onclick={(event) => {
							event.preventDefault();
							randomizeFakemon();
						}}
						class="flex max-w-16 cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
					>
						<Dice6 />
					</button>
					<button
						type="submit"
						class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
					>
						{#if loading}
							<LoaderCircle class="animate-spin" />
						{/if}
						Generate Fakemon
					</button>
				</div>
			</form>
		</div>
		<div class="flex flex-col gap-2 rounded-lg bg-gray-800 p-4">
			<div class="mt-4 flex flex-col gap-2 rounded-lg bg-gray-700 p-4">
				<p class="text-lg font-bold text-gray-300">Current Fakemon</p>
				<div class="flex gap-2">
					{#if form?.fakemonImage}
						<img class="h-60 w-60 rounded-lg" src={form?.fakemonImage} alt="Fakemon" />
					{/if}

					{#if form?.dexEntry}
						{@const dexEntry = form.dexEntry}
						<div class="flex flex-col gap-2">
							<p class="text-lg font-bold text-gray-300">{dexEntry.species}</p>
							<p class="text-sm text-gray-200">{dexEntry.dexEntry}</p>
						</div>
					{/if}
				</div>
			</div>
			<div class="grid grid-cols-4 gap-4">
				{#each fakemon as fakes, idx}
					{@const dexNumber = idx + 1}
					<div
						class="rounded-lg border border-gray-700 bg-gray-700 p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<div class="mb-2 aspect-square rounded-lg bg-gray-600">
							{#if fakes.imageUrl}
								<img src={fakes.imageUrl} alt={fakes.name} class="h-full w-full object-cover" />
							{:else}
								<div class="h-full w-full rounded-lg bg-gray-600"></div>
							{/if}
						</div>
						<div class="flex items-center justify-between">
							<div class="flex flex-col gap-2">
								{#if fakes.name}
									<h3 class="text-lg font-bold text-gray-300">{fakes.name}</h3>
								{/if}
								<div class="flex gap-2">
									{#if fakes.type1}
										<p class="text-sm text-gray-300">{fakes.type1}</p>
									{/if}
									{#if fakes.type2}
										<p class="text-sm text-gray-300">{fakes.type2}</p>
									{/if}
								</div>
								{#if !fakes.name && !fakes.type1 && !fakes.type2}
									<div class="flex flex-col gap-2">
										<p class="h-4 animate-pulse rounded bg-gray-200"></p>
										<p class="h-4 animate-pulse rounded bg-gray-200"></p>
										<p class="h-4 animate-pulse rounded bg-gray-200"></p>
									</div>
								{/if}
							</div>
							<div class="text-6xl font-bold text-gray-600">
								#{dexNumber}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
