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
      `${backendEndpoint}auth?type=user_data&access_token=${access_token}&access_secret=${access_token_secret}&userId=${user_id}&redirect_uri=${twitRedirectUri}`
    );

    return resp2.data.data as TwitterUser;
  } catch (e) {
    console.log("Failed getting user data:", e);
  }
};

export const getMutuals = async (
  access_token: string,
  access_token_secret: string,
  screen_name: string
) => {
  try {
    const resp = await axios.get(
      `${backendEndpoint}mutuals?&access_token=${access_token}&access_secret=${access_token_secret}&screen_name=${screen_name}`
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
