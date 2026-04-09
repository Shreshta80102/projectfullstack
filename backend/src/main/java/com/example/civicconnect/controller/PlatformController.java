package com.example.civicconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api")
public class PlatformController {
  private final List<Issue> issues = new ArrayList<>();
  private final List<Feedback> feedback = new ArrayList<>();
  private final List<Update> updates = new ArrayList<>();
  private final AtomicLong counter = new AtomicLong(1);

  public PlatformController() {
    issues.add(new Issue(nextId(), "Broken street lamps", "Street lamps are out on Elm Avenue.", "Safety", "Pending", "Elm Avenue", "Citizen"));
    feedback.add(new Feedback(nextId(), "City bus frequency", "Please increase bus frequency in the east sector.", "Transportation", "Pending", "Citizen"));
    updates.add(new Update(nextId(), "Community town hall", "Politician Lee will host a town hall meeting next week.", "politician", "Politician Lee"));
  }

  private String nextId() {
    return String.valueOf(counter.getAndIncrement());
  }

  @GetMapping("/issues")
  public List<Issue> getIssues() {
    return issues;
  }

  @PostMapping("/issues")
  public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
    Issue saved = new Issue(nextId(), issue.getTitle(), issue.getDescription(), issue.getCategory(), "Pending", issue.getLocation(), issue.getSubmittedBy());
    issues.add(0, saved);
    return ResponseEntity.ok(saved);
  }

  @PutMapping("/issues/{id}/status")
  public ResponseEntity<Issue> updateIssueStatus(@PathVariable String id, @RequestBody StatusUpdate update) {
    for (int i = 0; i < issues.size(); i++) {
      Issue issue = issues.get(i);
      if (issue.id().equals(id)) {
        Issue updatedIssue = new Issue(issue.getId(), issue.getTitle(), issue.getDescription(), issue.getCategory(), update.getStatus(), issue.getLocation(), issue.getSubmittedBy());
        issues.set(i, updatedIssue);
        return ResponseEntity.ok(updatedIssue);
      }
    }
    return ResponseEntity.notFound().build();
  }

  @GetMapping("/feedback")
  public List<Feedback> getFeedback() {
    return feedback;
  }

  @PostMapping("/feedback")
  public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback item) {
    Feedback saved = new Feedback(nextId(), item.getTitle(), item.getContent(), item.getCategory(), "Pending", item.getSubmittedBy());
    feedback.add(0, saved);
    return ResponseEntity.ok(saved);
  }

  @GetMapping("/updates")
  public List<Update> getUpdates() {
    return updates;
  }

  @PostMapping("/updates")
  public ResponseEntity<Update> createUpdate(@RequestBody Update item) {
    Update saved = new Update(nextId(), item.getTitle(), item.getContent(), item.getRole(), item.getAuthor());
    updates.add(0, saved);
    return ResponseEntity.ok(saved);
  }

  public static class Issue {
    private String id;
    private String title;
    private String description;
    private String category;
    private String status;
    private String location;
    private String submittedBy;

    public Issue(String id, String title, String description, String category, String status, String location, String submittedBy) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.category = category;
      this.status = status;
      this.location = location;
      this.submittedBy = submittedBy;
    }

    public Issue() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(String submittedBy) { this.submittedBy = submittedBy; }
  }

  public static class Feedback {
    private String id;
    private String title;
    private String content;
    private String category;
    private String status;
    private String submittedBy;

    public Feedback(String id, String title, String content, String category, String status, String submittedBy) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.category = category;
      this.status = status;
      this.submittedBy = submittedBy;
    }

    public Feedback() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(String submittedBy) { this.submittedBy = submittedBy; }
  }

  public static class Update {
    private String id;
    private String title;
    private String content;
    private String role;
    private String author;

    public Update(String id, String title, String content, String role, String author) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.role = role;
      this.author = author;
    }

    public Update() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
  }

  public static class StatusUpdate {
    private String status;

    public StatusUpdate() {}
    public StatusUpdate(String status) { this.status = status; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
  }
}
