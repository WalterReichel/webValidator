<template>
  <div class="m-auto my-0 max-w-[1088px] text-left">
    <section class="my-11 px-7">
      <p class="text-base">
        The IATI Validator checks if IATI data complies with the rules and guidance in the IATI Standard. Find
        information on how to improve the quality of development and humanitarian IATI data on resources and results to
        ensure it is accessible and useful.
      </p>
    </section>
    <section class="my-11 mx-7">
      <h3 class="my-4 text-lg font-bold">How does the IATI Validator work?</h3>
      <div class="text-base">
        <p class="mb-3">There are three ways to use the IATI Validator.</p>
        <ul class="list-none pl-4">
          <li class="mb-3 before:pr-3 before:content-['-']">
            <router-link to="/validate" class="text-secondary">Check Data</router-link> - Anyone can upload their IATI
            data files to be checked before publishing them.
          </li>
          <li class="mb-3 before:pr-3 before:content-['-']">
            <router-link to="/organisations" class="text-secondary">Public Data Viewer</router-link> - Anyone can check
            all IATI data files that have been published.
          </li>
          <li class="mb-3 before:pr-3 before:content-['-']">
            <a href="https://developer.iatistandard.org/api-details#api=iati-validator-v2" class="text-secondary"
              >Public API</a
            >
            - Developers can GET reports for published files or POST a file and receive a validation report
          </li>
        </ul>
        <p class="mb-3">
          The IATI Validator undertakes multiple layers of checks to identify where data does not comply with the IATI
          Standard. The Validator provides messages to indicate where errors have occurred and what needs to be changed.
        </p>
      </div>
    </section>
  </div>
</template>
