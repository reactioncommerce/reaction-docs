---
id: developer-kafka-streams
title: Kafka Streams Basics for Developers
---

Reaction is building a portion of our system on top of Kafka Streams. Kafka Streams is a library for building streaming applications on top of apache kafka. The software consists of layers of libraries building up from lower-level primitives to higher-level abstractions. The layers are:

- [Apache Kafka](https://kafka.apache.org/documentation/) is our platform for event-driven architectures
  - It provides a cluster of brokers able to process application events
  - Applications can write events to a kafka topic and other components can later read those events
  - It is designed for high throughput, reliability, and low-latency streaming
  - Kafka provides the low-level concepts of an events platform: topics, messages, producers, consumers
- [Kafka Streams](https://kafka.apache.org/24/documentation/streams/developer-guide/) is a library for building applications that are structured as a graph of kafka topics
  - Kafka Streams provides an API for describing an application as an interconnected topology of data flowing through kafka topics
  - It provides higher-level capabilities like transformation, filtering, windowing without having to code low-level produce/consume logic
- [jackdaw](https://github.com/FundingCircle/jackdaw) is a clojure library presenting the Kafka Streams API in a way more idiomatic to clojure and functional programming. We use this as our main foundation when building kafka streams applications


## Dependency Injection and Configuration Concepts

In our clojure code bases, we use two key libraries around configurability:

- [integrant](https://github.com/weavejester/integrant)
- [duct](https://github.com/duct-framework/duct)
  - Video: [Productive Duct: James Reeves](https://www.youtube.com/watch?v=IVnBW2mT7Po)

Integrant allows us to configure components within a software application, with dependency injection in mind. It allows a basic layer of configuration as a data map written as an edn (`config.edn`) file. We can then use clojure multimethods to initialize those map keys which allows us a place for any logic we may need relating to that configuration. There's hooks for validating the configuration map with a clojure spec as well.

Configuration can be re-used by various components in the `config.edn` file via the `#ig/ref` edn tag. This allows dependency injection.

Duct builds on top of integrant to define more components that can be shared and reused across applications like http servers, loggers, etc.
