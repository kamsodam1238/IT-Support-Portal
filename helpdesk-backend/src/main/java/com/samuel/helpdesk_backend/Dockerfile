# Use Maven with Java 21 to build the project
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the backend source code
COPY src ./src

# Build the Spring Boot jar and skip tests
RUN mvn clean package -DskipTests


# Use a smaller JDK image to run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/helpdesk-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Render will use
EXPOSE 8080

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]