extern crate kt_models;

use schemars::schema_for;

fn main() {
    let schema = schema_for!(kt_models::Bucket);
    println!("{}", serde_json::to_string_pretty(&schema).unwrap());
}
