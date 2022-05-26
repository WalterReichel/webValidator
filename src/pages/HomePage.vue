<script setup>
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import StyledLink from '../components/StyledLink.vue';
  import CardiB from '../components/CardiB.vue';
</script>

<template>
  <ContentContainer class="pt-6 pb-8">
    <p class="pb-4 text-lg">
      The IATI Validator is an online tool for checking if data aligns with the rules and guidance of IATI Standard. It
      allows users to check and improve the quality of IATI data to ensure it is accessible and useful to anyone working
      with data on development and humanitarian resources and results.
    </p>
    <p class="pb-4 text-lg">
      For more information, see
      <StyledLink
        to="https://prod-iati-website.azureedge.net/prod-iati-website/documents/QA__IATI_Validator-__September_2021_2.pdf"
        :external="true"
        >IATI Validator Q&A</StyledLink
      >.
    </p>

    <div class="-m-2.5 flex flex-wrap pt-4">
      <CardiB heading="Check Data" class="flex w-16 flex-col"> Content Goes Here </CardiB>
      <CardiB heading="Public Data Viewer" class="flex w-16 flex-col"> Content Goes Here </CardiB>
      <CardiB heading="Public API" class="flex w-16 flex-col">
        <p>Validate IATI files or retrieve validation reports using the public IATI API</p>
        <ul class="my-4 list-disc pl-10">
          <li><code class="text-iati-code">GET</code> existing validation reports for published files</li>
          <li><code class="text-iati-code">POST</code> IATI XML and receive validation results</li>
        </ul>
        <div class="w-full text-center">
          <a
            class="mx-auto inline-block bg-iati-green px-5 py-2 uppercase text-white hover:bg-iati-blue"
            href="https://developer.iatistandard.org/api-details#api=iati-validator-v2"
            target="_blank"
            role="button"
          >
            Public API
          </a>
        </div>
      </CardiB>
    </div>
  </ContentContainer>
</template>

<script>
  export default {
    props: {
      msg: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      console.log(props.msg);
    },
  };
</script>
