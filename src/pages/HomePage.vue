<script setup>
  import ContentContainer from '../components/layout/ContentContainer.vue';
  import StyledLink from '../components/StyledLink.vue';
</script>

<template>
  <ContentContainer class="pt-6">
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
