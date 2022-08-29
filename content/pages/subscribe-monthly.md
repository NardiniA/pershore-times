---
title: Subscribe Monthly
description: Fill in the form below to subscribe to the electronic version of the
  Pershore Times Monthly via email.
sections:
- template: page-header
  title: Subscribe Monthly
- template: contact
  form:
    title: Subscribe
    action: contact@antonionardini.com
    fields:
    - template: input
      type: email
      config:
        required:
          value: true
          message: This field is required.
        minLength:
          message: Not long enough.
          value: 
        maxLength:
          message: Too many characters.
          value: 
      name: Email
      id: email_address_subscribe
      placeholder: Email address
    - template: input
      type: text
      config:
        required:
          value: true
          message: This field is required.
        minLength:
          message: Not long enough.
          value: 
        maxLength:
          message: Too many characters.
          value: 
      name: First name
      id: first_name_subscribe
      placeholder: First Name
    - template: input
      type: text
      config:
        required:
          value: true
          message: This field is required.
        minLength:
          message: Not long enough.
          value: 
        maxLength:
          message: Too many characters.
          value: 
      name: Last Name
      id: last_name_subscribe
      placeholder: Last Name
    - template: select
      config:
        required:
          value: true
          message: This field is required.
      name: Interest
      id: interest_subscribe
      placeholder: Your interests...
      options:
      - label: News
        value: news
      - label: Business
        value: business
      - value: leisure
        label: Leisure
      - label: Sport
        value: sport
      - label: All
        value: all
  title: Subscribe Monthly
  content: Fill out the form below to subscribe to the electronic copy of our monthly
    newspaper.
  contact_info:
    title: Got any problems?<br>Contact us using our email or phone and we can sort
      you out.
    email_address: office@pershoretimes.com
    phone_number: '01386 803803'

---
