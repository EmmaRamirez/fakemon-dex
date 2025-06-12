<script lang="ts">
	import type { PageProps } from './$types';
	import TypeSelect from '$lib/components/TypeSelect.svelte';
	import HabitatSelect from '$lib/components/HabitatSelect.svelte';
	import BestStats from '$lib/components/BestStats.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import { Dice6, LoaderCircle } from 'lucide-svelte';

	let { data, form }: PageProps = $props();

	let fakemon = data.entries;
	let loading = $state(false);
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

				<BestStats
					name="bestStats"
					labelText="Best Stats"
					labelClass="block text-sm font-medium text-gray-300"
				/>

				<Slider
					name="height"
					labelText="Height"
					labelClass="block text-sm font-medium text-gray-300"
				/>
				<Slider
					name="weight"
					labelText="Weight"
					labelClass="block text-sm font-medium text-gray-300"
				/>

				<div class="button-group flex w-full gap-2">
					<button
						class="flex max-w-16 items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none cursor-pointer"
					>
						<Dice6 />
					</button>
					<button
						type="submit"
						class="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none cursor-pointer"
					>
						{#if loading}
							<LoaderCircle class="animate-spin" />
						{/if}
						Generate Fakemon
					</button>
				</div>
			</form>
		</div>
		<div class="rounded-lg bg-gray-800 p-4 flex flex-col gap-2">
			<div class="mt-4 flex flex-col gap-2 rounded-lg bg-gray-700 p-4">
				{#if form?.dexEntry}
					<p class="text-sm text-gray-500">{form.dexEntry}</p>
				{/if}

				{#if form?.fakemonImage}
					<img src={form?.fakemonImage} alt="Fakemon" />
				{/if}
			</div>
			<div class="grid grid-cols-4 gap-4">
				{#each fakemon as fakes}
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
