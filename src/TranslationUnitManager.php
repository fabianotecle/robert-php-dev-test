<?php

require_once '../src/db.php';
require_once 'TranslationUnit.php';

class TranslationUnitManager
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = DB::connect();;
    }

    public function addUnit(string $source, string $translated, string $from, string $to): int
    {
        $stmt = $this->pdo->prepare("INSERT INTO translations (source_text, translated_text, language_from, language_to) VALUES (?, ?, ?, ?)");
        $stmt->execute([$source, $translated, $from, $to]);
        return $this->pdo->lastInsertId();
    }

    public function getUnit(int $id): ?TranslationUnit
    {
        $stmt = $this->pdo->prepare("SELECT * FROM translations WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$row) return null;

        return new TranslationUnit(
            $row['id'],
            $row['source_text'],
            $row['translated_text'],
            $row['language_from'],
            $row['language_to']
        );
    }

    public function updateUnit(int $id, string $newSourceText, string $newTranslation): bool
    {
        $stmt = $this->pdo->prepare("UPDATE translations SET source_text = ?, translated_text = ?, updated_at = NOW() WHERE id = ?");
        return $stmt->execute([$newSourceText, $newTranslation, $id]);
    }

    public function getAll(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM translations ORDER BY id DESC LIMIT 10");
        $results = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $results[] = new TranslationUnit(
                $row['id'],
                $row['source_text'],
                $row['translated_text'],
                $row['language_from'],
                $row['language_to']
            );
        }

        return $results;
    }

    // Extra: retorna os dados como array para API JSON
    public function getAllAsArray(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM translations ORDER BY id DESC LIMIT 10");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
