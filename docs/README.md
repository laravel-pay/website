---
home: true
heroImage: /logo.png
heroText: Laravel Payment Providers
tagline: A collection of Payment Providers for Laravel
actionText: Browse Providers →
actionLink: /about/
---

<style>
.hero .description {
    max-width:40rem !important
}

.hero img {
    height: 10em;
}

.maintain {
    display: block;
    margin-top: 0.3em;
    color: #989898;
}
</style>

<div class="features">
  <div class="feature">
    <h2>Simplicity First</h2>
    <p>Minimal setup with quick integration helps you focus on developing your newest product.</p>
  </div>

  <div class="feature">
    <h2>{{ $themeConfig.channelCount }} ready to use payment providers</h2>
    <p>
        Laravel Pay provides a collection of payment providers for Laravel. 
        Each provider has a separate repository with documentation and installation instructions.
    </p>
  </div>

  <div class="feature">
    <h2>Community Powered</h2>
    <p>
    Providers are built and maintained by the community. 
    Want to add a provider you use? Make a suggestion or add your channel on 
    <a href="https://github.com/laravel-pay/payment-providers">payment providers repo</a>.
    </p>
  </div>

</div>

<div class="footer">
    MIT Licensed | Copyright © {{ (new Date).getFullYear() }} | <a href="https://github.com/orgs/laravel-pay/people">Contributors</a>
    <small class="maintain">Maintained by <a href="https://github.com/elsayed85">Elsayed Kamal</a></small>
</div>
