FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x mvnw

COPY src src
RUN ./mvnw -B -DskipTests package

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

RUN mkdir -p /tmp/tourgo/uploads

ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"

COPY --from=build /app/target/tourGo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3000

CMD ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-3000} -jar app.jar"]
