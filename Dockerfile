FROM maven:3.9.6-eclipse-temurin-17-alpine AS construction-engine

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests=false

FROM eclipse-temurin:17-jre-alpine AS deployment-perimeter

WORKDIR /app

RUN addgroup -S althealgroup && adduser -S althealuser -G althealgroup

COPY --from=construction-engine /app/target/wellnessos-0.0.1-SNAPSHOT.jar ./wellnessos.jar

USER althealuser

EXPOSE 5000

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-XX:+UseG1GC", "-jar", "wellnessos.jar"]
