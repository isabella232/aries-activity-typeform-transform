![alt text](/img/logo.png "Aries Integration for Transforming Typeform")

#Aries Integration for Transforming [Typeform](https://www.typeform.com/help/data-api/)

[![CircleCI](https://circleci.com/gh/aries-data/aries-activity-typeform-transform.svg?style=svg)](https://circleci.com/gh/aries-data/aries-activity-typeform-transform)

Typeform is a web-based platform where users can create online forms. Users will then be able to monitor and track answers associated with each form. This integration transforms the raw response into a mapped array of objects with key/value pairs set as question/answer.

## Response
This integration transforms the raw response into a mapped array of objects with key/value pairs set as question/answer values.
```javascript
[
  {
    "What_is_your_gender": "Male",
    "What_is_your_age": "18 to 24",
    "What_is_the_highest_level_of_education_you_have_completed": "Bachelor's degree",
    "In_which_country_were_you_born": "United States of America",
    "What_is_your_ethnicity": "Asian",
    "What_is_your_marital_status": "Single (never married)",
    "What_is_your_height": "5'3\" - 5'7\"",
    "Which_of_the_following_brands_do_you_wear": "Nike",
    "Which_of_the_following_brands_do_you_wear_1": "Adidas",
    "Which_of_the_following_brands_do_you_wear_2": "Under Armour",
    "Which_of_the_following_brands_do_you_wear_3": "North Face",
    "How_many_shoes_have_you_bought_in_the_past_year": "1",
    "How_much_have_you_spent_on_athletic_apparel_in_the_past_year": "$101 - $150",
    "What_sports_do_you_frequently_follow": "Football",
    "What_sports_do_you_frequently_follow_1": "Basketball",
    "What_sports_do_you_frequently_follow_2": "Tennis",
    "Where_do_you_learn_about_new_athletic_products": "Television",
    "Where_do_you_learn_about_new_athletic_products_1": "Magazines",
    "Where_do_you_learn_about_new_athletic_products_2": "Friends & Family",
    "timestamp": "2016-07-12T03:43:01.319Z"
  },
  {
    "What_is_your_gender": "Male",
    "What_is_your_age": "25 to 34",
    "What_is_the_highest_level_of_education_you_have_completed": "Bachelor's degree",
    "In_which_country_were_you_born": "United States of America",
    "What_is_your_ethnicity": "White",
    "What_is_your_marital_status": "Single (never married)",
    "What_is_your_height": "5'3\" - 5'7\"",
    "Which_of_the_following_brands_do_you_wear": "Nike",
    "Which_of_the_following_brands_do_you_wear_1": "Adidas",
    "Which_of_the_following_brands_do_you_wear_2": "Under Armour",
    "How_many_shoes_have_you_bought_in_the_past_year": "2",
    "How_much_have_you_spent_on_athletic_apparel_in_the_past_year": "$101 - $150",
    "What_sports_do_you_frequently_follow": "Football",
    "What_sports_do_you_frequently_follow_1": "Basketball",
    "What_sports_do_you_frequently_follow_2": "Golf",
    "Where_do_you_learn_about_new_athletic_products": "Friends & Family",
    "timestamp": "2016-07-12T03:43:01.319Z"
  }
 ]
 ```
