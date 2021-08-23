import axios from "axios";
import { backendEndpoint, setTempStorage } from "./util";
const twitRedirectUri = window.location.origin;

export const login = async () => {
  try {
    const resp = await axios.get(
      `${backendEndpoint}auth?type=request_token&redirect_uri=${twitRedirectUri}`
    );

    const token = resp.data.data.oauthRequestToken;
    const secret = resp.data.data.oauthRequestTokenSecret;

    if (token && secret) {
      setTempStorage("twitter_token", token);
      setTempStorage("twitter_secret", secret);

      window.open(
        "https://twitter.com/oauth/authenticate?oauth_token=" + token,
        "_self"
      );
    }
  } catch (e) {
    console.log("Logging in users", e);
  }
};

export const getAccessCredentials = async (
  request_token: string,
  request_token_secret: string,
  oauth_verifier: string
) => {
  try {
    const resp = await axios.get(
      `${backendEndpoint}auth?type=auth_token&request_token=${request_token}&request_secret=${request_token_secret}&verifier=${oauth_verifier}&redirect_uri=${twitRedirectUri}`
    );

    const token = resp.data.data.oauthAccessToken;
    const secret = resp.data.data.oauthAccessTokenSecret;
    const user_id = resp.data.data.results.user_id;

    if (token && secret && user_id) {
      setTempStorage("access_token", token);
      setTempStorage("user_id", user_id);
      setTempStorage("access_secret", secret);
    }

    return resp.data.data;
  } catch (e) {
    console.log("Failed getting access credtials:", e);
  }

  return false;
};

export const getUserData = async (
  access_token: string,
  access_token_secret: string,
  user_id: string
) => {
  try {
    const resp2 = await axios.get(
      `${backendEndpoint}user?access_token=${access_token}&access_secret=${access_token_secret}&user_id=${user_id}`
    );

    if (resp2.data.user && resp2.data.tweets)
      return {
        user: resp2.data.user,
        tweets: resp2.data.tweets,
        hasShared: resp2.data.hasShared,
      } as {
        user: TwitterUser;
        tweets: Tweet[];
        hasShared: boolean;
      };
    else return { user: null, tweets: [], hasShared: false };
  } catch (e) {
    console.log("Failed getting user data:", e);
  }
  return { user: null, tweets: [], hasShared: false };
};

export const getRelationship = async (
  access_token: string,
  access_token_secret: string,
  target_id: string
) => {
  try {
    const resp = await axios.get(
      `${backendEndpoint}relationship?access_token=${access_token}&access_secret=${access_token_secret}&target_id=${target_id}`
    );

    return resp.data as {
      target: TwitterUser;
      mutuals: boolean;
      likesBack: boolean;
      canDm: boolean;
    };
  } catch (e) {
    console.log("Failed getting user data:", e);
  }
  return { target: null, mutuals: false, likesBack: false, canDm: false };
};

export const checkIfShared = async (
  access_token: string,
  access_token_secret: string
) => {
  try {
    const resp2 = await axios.get(
      `${backendEndpoint}share?access_token=${access_token}&access_secret=${access_token_secret}`
    );

    return resp2.data.shared as boolean;
  } catch (e) {
    console.log("Failed getting user data:", e);
  }
  return false;
};

export const getMutuals = async (
  access_token: string,
  access_token_secret: string,
  screen_name: string
) => {
  try {
    const resp = await axios.get(
      `${backendEndpoint}mutuals?access_token=${access_token}&access_secret=${access_token_secret}&screen_name=${screen_name}`
    );

    return resp.data;
  } catch (e) {
    console.log("Failed getting user data:", e);
  }
};

export const userSwipe = async (
  access_token: string,
  access_token_secret: string,
  target_id: string,
  swipe: "like" | "dislike"
) => {
  try {
    const resp = await axios.get(
      `${backendEndpoint}swipe?access_token=${access_token}&access_secret=${access_token_secret}&target_id=${target_id}&swipe=${swipe}`
    );

    return resp.data;
  } catch (e) {
    console.log("Failed getting user data:", e);
  }
};

export interface Url2 {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface Url {
  urls: Url2[];
}

export interface Description {
  urls: any[];
}

export interface Entities {
  url: Url;
  description: Description;
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface Entities2 {
  hashtags: any[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: any[];
}

export interface Url3 {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface Entities3 {
  hashtags: any[];
  symbols: any[];
  user_mentions: any[];
  urls: Url3[];
}

export interface RetweetedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: Entities3;
  source: string;
  in_reply_to_status_id?: any;
  in_reply_to_status_id_str?: any;
  in_reply_to_user_id?: any;
  in_reply_to_user_id_str?: any;
  in_reply_to_screen_name?: any;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
}

export interface Status {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: Entities2;
  source: string;
  in_reply_to_status_id?: any;
  in_reply_to_status_id_str?: any;
  in_reply_to_user_id?: any;
  in_reply_to_user_id_str?: any;
  in_reply_to_screen_name?: any;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  retweeted_status: RetweetedStatus;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
}

export interface TwitterUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  profile_location?: any;
  description: string;
  url: string;
  entities: Entities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset?: any;
  time_zone?: any;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang?: any;
  status: Status;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
  withheld_in_countries: any[];
  suspended: boolean;
  needs_phone_verification: boolean;
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface Url {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface Medium2 {
  w: number;
  h: number;
  resize: string;
}

export interface Thumb {
  w: number;
  h: number;
  resize: string;
}

export interface Small {
  w: number;
  h: number;
  resize: string;
}

export interface Large {
  w: number;
  h: number;
  resize: string;
}

export interface Sizes {
  medium: Medium2;
  thumb: Thumb;
  small: Small;
  large: Large;
}

export interface Medium {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes;
}

export interface Entities {
  hashtags: any[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: Url[];
  media: Medium[];
}

export interface Url3 {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface Url2 {
  urls: Url3[];
}

export interface Description {
  urls: any[];
}

export interface Entities2 {
  url: Url2;
  description: Description;
}

export interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  entities: Entities2;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset?: any;
  time_zone?: any;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang?: any;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
  withheld_in_countries: any[];
}

export interface Medium4 {
  w: number;
  h: number;
  resize: string;
}

export interface Thumb2 {
  w: number;
  h: number;
  resize: string;
}

export interface Small2 {
  w: number;
  h: number;
  resize: string;
}

export interface Large2 {
  w: number;
  h: number;
  resize: string;
}

export interface Sizes2 {
  medium: Medium4;
  thumb: Thumb2;
  small: Small2;
  large: Large2;
}

export interface Medium3 {
  id: any;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes2;
}

export interface ExtendedEntities {
  media: Medium3[];
}

export interface Tweet {
  created_at: string;
  id: any;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: Entities;
  source: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str: string;
  in_reply_to_screen_name: string;
  user: User;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
  possibly_sensitive?: boolean;
  extended_entities: ExtendedEntities;
}
