(define-data-var connections (list 50 principal) (list ))

(define-public (add-key (keyid principal))
    (match (index-of? connections keyid) index (ok 3) (append connections keyid))
)

(define-public (remove-key (keyid principal))
)

(define-public (acceptable-keys (business principal))
    )



;; (match indexof 0 stuff_to_do_if_0 else