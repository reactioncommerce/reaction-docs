---
id: version-3.0.0-developer-kafka-streams
title: Developer Concepts: Kafka Streams
sidebar_label: Kafka Streams
original_id: developer-kafka-streams
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

## Kafka Streams Developer Glossary

- **Message, Key, Value** Data is written to and read from kafka as a series of discreet Messages. Messages are a key/value pair. Keys and values can be any arbitrary data type including byte arrays. While keys can be null, within reaction keys will most of the time be strings that correspond to database primary key identifiers. Values will typically be JSON or avro encoded maps/structs.
- **Topic** A topic is a named, ordered set of messages in kafka. Each topic has a particular set of configurations but can be simply thought of "where you go to read messages about X".
- **Partition** Within a kafka topic, data is scaled by distributing it across a configurable number of partitions, each of which holds a fraction of the data.
- **Topology** In kafka streams, the graph of interconnected topics joined by application code is called the topology.
- **Kafka Streams Application** a JVM program that interacts with kafka via the kafka streams framework.
- **Processor** This is the jackdaw/rentpath term for a kafka streams application as instantiated within a duct application
- **Offset** The mechanism used by kafka consumers to keep track of their position in a topic. Resetting an application's consumer offset to zero causes it to "start over" and re-process all messages from the beginning.
- **Broker** the main server component of a kafka cluster.
- **Application Reset Tool** The [application reset tool](https://docs.confluent.io/current/streams/developer-guide/app-reset-tool.html) from confluent.
- **REPL** Read Eval Print Loop is a primary tool for clojure interactive application development
- **Serdes** is jargon for "Serializers" and "Deserializers". These are java classes responsible for data conversion between kafka message format (some form of encoded byte array) and java objects in a particular data type (String, Double, Map, Array, etc)

## Further Study

- [Beginners Guide to Kafka](https://iteritory.com/beginners-guide-apache-kafka-basic-architecture-components-concepts/)
- [Apache Kafka for Beginners](https://www.youtube.com/playlist?list=PLt1SIbA8guusxiHz9bveV-UHs_biWFegU)
- [Kafka Streams Documentation](https://docs.confluent.io/current/streams/index.html)
- [Apache Avro Documentation](https://avro.apache.org/docs/current/)
- [Avro Introduction](https://www.youtube.com/watch?v=SZX9DM_gyOE)
- [Kafka Streams, the Clojure way](https://clojure-conundrums.co.uk/posts/kafka-streams-the-clojure-way/)
- [Clojure for the Brave and True](https://www.braveclojure.com/clojure-for-the-brave-and-true/)
