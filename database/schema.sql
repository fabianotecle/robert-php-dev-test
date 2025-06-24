-- Implement the database schema as discussed in the design.

CREATE TABLE translation_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source_text TEXT NOT NULL,
    translated_text TEXT,
    language_from VARCHAR(10) NOT NULL,
    language_to VARCHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE translation_unit_versions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    translation_unit_id INT NOT NULL,
    old_translated_text TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (translation_unit_id) REFERENCES translation_units(id) ON DELETE CASCADE
);