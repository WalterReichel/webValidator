<template>
  <table class="w-full table-auto">
    <thead class="border-y border-solid border-gray-300">
      <tr>
        <th class="py-2.5 first:pl-3.5">File Name</th>
        <th class="py-2.5">Identified in Registry</th>
        <th class="py-2.5">Validated</th>
        <th class="py-2.5">Validation Status</th>
        <th class="py-2.5">Available in IATI Datastore</th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
