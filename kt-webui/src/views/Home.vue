<template lang="pug">
div
  b-alert(v-if="$isAndroid" show)
    | #[b Note:] KomuTracker on Android is in a very early stage of development. There will be bugs, but we hope you bear with us as we refine things and get it on par with the desktop version of KomuTracker (which you should try!).

  h3 Hello early user,
  p
    | It's still early days for KomuTracker#[span(v-if="$isAndroid") (especially on Android!)]. We've come a long way but we need users (like you!)
    | to provide feedback and help us turn KomuTracker into a successful project.
    | Early users like you mean a lot to us, and we hope you'll reach out to us with any ideas you have for improvements!
  p
    | If you are a developer, we hope you can contribute by writing a watcher, visualization, or something else, and share it with us on the forum!
  p
    div Thank you for using KomuTracker!
    small If you have a minute to spare, please take the time to fill out our #[a(href="https://forms.gle/q2N9K5RoERBV8kqPA") user survey] or #[a(href="https://forum.komutracker.net/c/features") vote on features on the forum].

  hr

  div.row
    div.col-md-6
      h4 Spread the word
      p
        | Nothing is as motivating as getting KomuTracker into the hands of users.
        | By sharing it you get us to make KomuTracker even better!
      ul
        li Give us a like and a review on #[a(href="https://alternativeto.net/software/komutracker/") AlternativeTo]
        li Vote on us at #[a(href="https://www.producthunt.com/posts/komutracker") ProductHunt]
        li Follow us and spread the word on #[a(href="https://twitter.com/KomuTrackerIt") Twitter] and #[a(href="https://www.facebook.com/KomuTracker") Facebook]
        li Star us on #[a(href="https://github.com/ncc-sg/komutracker-rust") GitHub]

    div.col-md-6
      h4 Support us!
      p
        | Do you like KomuTracker? Has it helped you? Help us help you by donating!
        | You can donate to us via:
      ul
        li #[a(href="https://www.patreon.com/erikbjare") Patreon]
        li #[a(href="https://opencollective.com/komutracker") Open Collective]
        li #[a(href="https://liberapay.com/KomuTracker/") Liberapay]
        li #[a(href="https://komutracker.net/donate/") Other methods] (incl. cryptocurrency)
      p
        | For more info, please visit the #[a(href="https://komutracker.net/donate/") donation page on the website].

  hr

  div.row
    div.col-md-6
      h4 Resources
      p
        ul
          li #[a(href="https://komutracker.net/") Website]
          li #[a(href="https://komutracker.readthedocs.org/") Documentation]
          li #[a(href="https://forum.komutracker.net/") Forum]
          li #[a(href="https://discord.gg/vDskV9q") Discord]
          li #[a(href="https://github.com/ncc-sg/komutracker-rust") GitHub]
          li #[a(href="/api/") API Browser]

    div.col-md-6
      h4 Want to know what we're working on?
      p
        | Check out the #[a(href="https://forum.komutracker.net/c/news") development updates]!

  hr

  p
    small
      i
        | You can change which page opens when you open KomuTracker (instead of this page) in the #[router-link(to="/settings") settings].

</template>

<script lang="ts">
export default {
  name: 'Home',
};
</script>
