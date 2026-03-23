use std::future::Future;
use std::{collections::HashMap, error::Error};

use chrono::{DateTime, Utc};

use kt_models::{Bucket, Event};

use super::KtClient as AsyncKtClient;

pub struct KtClient {
    client: AsyncKtClient,
    pub baseurl: reqwest::Url,
    pub name: String,
    pub hostname: String,
}

impl std::fmt::Debug for KtClient {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "KtClient(baseurl={:?})", self.client.baseurl)
    }
}

fn block_on<F: Future>(f: F) -> F::Output {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .expect("build shell runtime")
        .block_on(f)
}

macro_rules! proxy_method
{
    ($name:tt, $ret:ty, $($v:ident: $t:ty),*) => {
        pub fn $name(&self, $($v: $t),*) -> Result<$ret, reqwest::Error>
        { block_on(self.client.$name($($v),*)) }
    };
}

impl KtClient {
    pub fn new(host: &str, port: u16, name: &str) -> Result<KtClient, Box<dyn Error>> {
        let async_client = AsyncKtClient::new(host, port, name)?;

        Ok(KtClient {
            baseurl: async_client.baseurl.clone(),
            name: async_client.name.clone(),
            hostname: async_client.hostname.clone(),
            client: async_client,
        })
    }

    proxy_method!(get_bucket, Bucket, bucketname: &str);
    proxy_method!(get_buckets, HashMap<String, Bucket>,);
    proxy_method!(create_bucket, (), bucket: &Bucket);
    proxy_method!(create_bucket_simple, (), bucketname: &str, buckettype: &str);
    proxy_method!(delete_bucket, (), bucketname: &str);
    proxy_method!(
        get_events,
        Vec<Event>,
        bucketname: &str,
        start: Option<DateTime<Utc>>,
        stop: Option<DateTime<Utc>>,
        limit: Option<u64>
    );
    proxy_method!(
        query,
        Vec<serde_json::Value>,
        query: &str,
        timeperiods: Vec<(DateTime<Utc>, DateTime<Utc>)>
    );
    proxy_method!(insert_event, (), bucketname: &str, event: &Event);
    proxy_method!(insert_events, (), bucketname: &str, events: Vec<Event>);
    proxy_method!(
        heartbeat,
        (),
        bucketname: &str,
        event: &Event,
        pulsetime: f64
    );
    proxy_method!(delete_event, (), bucketname: &str, event_id: i64);
    proxy_method!(get_event_count, i64, bucketname: &str);
    proxy_method!(get_info, kt_models::Info,);
    proxy_method!(get_setting, serde_json::Value, setting: &str);
    proxy_method!(get_settings, kt_models::Settings,);

    pub fn wait_for_start(&self) -> Result<(), Box<dyn Error>> {
        self.client.wait_for_start()
    }
}
