<script setup>
  import SectionSeparator from '../components/SectionSeparator.vue';
  import AboutSection from '../components/AboutSection.vue';
  import CheckedList from '../components/CheckedList/CheckedList.vue';
  import ListItem from '../components/CheckedList/ListItem.vue';
  import StyledLink from '../components/StyledLink.vue';
</script>

<template>
  <div class="m-auto my-0 max-w-[1088px] text-left">
    <AboutSection>
      <p class="text-base">
        The IATI Validator checks if IATI data complies with the rules and guidance in the IATI Standard. Find
        information on how to improve the quality of development and humanitarian IATI data on resources and results to
        ensure it is accessible and useful.
      </p>
    </AboutSection>
    <AboutSection title="How does the IATI Validator work?">
      <div class="text-base">
        <p class="mb-3">There are three ways to use the IATI Validator.</p>
        <CheckedList>
          <ListItem>
            <StyledLink to="/validate">Check Data</StyledLink> - Anyone can upload their IATI data files to be checked
            before publishing them.
          </ListItem>
          <ListItem>
            <StyledLink to="/organisations">Public Data Viewer</StyledLink> - Anyone can check all IATI data files that
            have been published.
          </ListItem>
          <ListItem>
            <StyledLink to="https://developer.iatistandard.org/api-details#api=iati-validator-v2" :external="true"
              >Public API
            </StyledLink>
            - Developers can GET reports for published files or POST a file and receive a validation report
          </ListItem>
        </CheckedList>
        <p class="mb-3">
          The IATI Validator undertakes multiple layers of checks to identify where data does not comply with the IATI
          Standard. The Validator provides messages to indicate where errors have occurred and what needs to be changed.
        </p>
      </div>
    </AboutSection>
    <SectionSeparator />
    <AboutSection title="What happens when the IATI Validator identifies invalid data?">
      <div class="text-base">
        <p class="mb-3">
          When the IATI Validator identifies invalid data, it returns a message to the user. A critical, error or a
          warning message is displayed for each occurrence, identifying what data needs to be corrected and where it
          occurs in the data file. A count of errors is also displayed which shows how many times an error is repeated
          throughout a file. For example, if all activities in a dataset have omitted activity dates, then the user will
          see a count of this repeated error as well as the location of each error.
        </p>
      </div>
    </AboutSection>
    <SectionSeparator />
  </div>
</template>
