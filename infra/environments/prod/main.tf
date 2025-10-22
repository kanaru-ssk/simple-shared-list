terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6"
    }
  }

  backend "gcs" {
    bucket = "simple-shared-list-prod-tfstate"
    prefix = "application"
  }
}

provider "google" {
  project = "simple-shared-list-prod"
  region  = "asia-northeast1"
}

module "application" {
  source = "../../module"
}
